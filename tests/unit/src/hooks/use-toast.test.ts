import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer, genId } from "@/hooks/use-toast";

describe("use-toast hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("reducer", () => {
    it("should add toast with ADD_TOAST action", () => {
      const initialState = { toasts: [] };
      const newToast = { id: "1", title: "Test", open: true };
      
      const state = reducer(initialState, {
        type: "ADD_TOAST",
        toast: newToast,
      });

      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0]).toEqual(newToast);
    });

    it("should respect toast limit", () => {
      const initialState = {
        toasts: [{ id: "1", title: "First", open: true }],
      };
      const newToast = { id: "2", title: "Second", open: true };
      
      const state = reducer(initialState, {
        type: "ADD_TOAST",
        toast: newToast,
      });

      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].id).toBe("2");
    });

    it("should update toast with UPDATE_TOAST action", () => {
      const initialState = {
        toasts: [{ id: "1", title: "Old", open: true }],
      };
      
      const state = reducer(initialState, {
        type: "UPDATE_TOAST",
        toast: { id: "1", title: "New" },
      });

      expect(state.toasts[0].title).toBe("New");
    });

    it("should dismiss toast with DISMISS_TOAST action", () => {
      const initialState = {
        toasts: [{ id: "1", title: "Test", open: true }],
      };
      
      const state = reducer(initialState, {
        type: "DISMISS_TOAST",
        toastId: "1",
      });

      expect(state.toasts[0].open).toBe(false);
    });

    it("should dismiss all toasts when toastId is undefined", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "First", open: true },
          { id: "2", title: "Second", open: true },
        ],
      };
      
      const state = reducer(initialState, {
        type: "DISMISS_TOAST",
        toastId: undefined,
      });

      expect(state.toasts.every(t => !t.open)).toBe(true);
    });

    it("should remove toast with REMOVE_TOAST action", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "First", open: true },
          { id: "2", title: "Second", open: true },
        ],
      };
      
      const state = reducer(initialState, {
        type: "REMOVE_TOAST",
        toastId: "1",
      });

      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].id).toBe("2");
    });

    it("should remove all toasts when toastId is undefined", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "First", open: true },
          { id: "2", title: "Second", open: true },
        ],
      };
      
      const state = reducer(initialState, {
        type: "REMOVE_TOAST",
        toastId: undefined,
      });

      expect(state.toasts).toHaveLength(0);
    });
  });

  describe("toast function", () => {
    it("should create toast with unique id", () => {
      const t1 = toast({ title: "First" });
      const t2 = toast({ title: "Second" });

      expect(t1.id).toBeDefined();
      expect(t2.id).toBeDefined();
      expect(t1.id).not.toBe(t2.id);
    });

    it("should return dismiss and update functions", () => {
      const t = toast({ title: "Test" });

      expect(typeof t.dismiss).toBe("function");
      expect(typeof t.update).toBe("function");
    });
  });

  describe("useToast hook", () => {
    it("should return toasts array and toast function", () => {
      const { result } = renderHook(() => useToast());

      expect(Array.isArray(result.current.toasts)).toBe(true);
      expect(typeof result.current.toast).toBe("function");
      expect(typeof result.current.dismiss).toBe("function");
    });

    it("should add toast when toast function is called", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: "Test Toast" });
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe("Test Toast");
    });

    it("should dismiss toast when dismiss is called", () => {
      const { result } = renderHook(() => useToast());

      let toastId: string;
      act(() => {
        const t = result.current.toast({ title: "Test" });
        toastId = t.id;
      });

      act(() => {
        result.current.dismiss(toastId);
      });

      expect(result.current.toasts[0].open).toBe(false);
    });

    it("should dismiss all toasts when dismiss is called without id", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: "First" });
        result.current.toast({ title: "Second" });
      });

      act(() => {
        result.current.dismiss();
      });

      expect(result.current.toasts.every(t => !t.open)).toBe(true);
    });
  });

  describe("genId", () => {
    it("should generate unique incremental ids", () => {
      const id1 = genId();
      const id2 = genId();
      const id3 = genId();

      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
      expect(parseInt(id2)).toBe(parseInt(id1) + 1);
    });
  });
});
