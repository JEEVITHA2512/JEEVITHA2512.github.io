import urllib.request
import json

def check_jsdelivr(name):
    # Using jsDelivr data API to list files in a package folder
    # Or just try common extensions
    common_filenames = [
        f"{name}-original.svg",
        f"{name}-original-wordmark.svg",
        f"{name}-plain.svg",
        f"{name}-plain-wordmark.svg",
        f"{name}-line.svg",
        f"{name}-line-wordmark.svg",
    ]
    
    found = []
    for fn in common_filenames:
        url = f"https://raw.githubusercontent.com/devicons/devicon/master/icons/{name}/{fn}"
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    found.append(url)
        except Exception:
            pass
            
    # Also try generic names or sub-slugs
    if not found:
        print(f"No standard names found for '{name}' using simple extensions.")
    else:
        print(f"Found files for '{name}':")
        for f in found:
            print("  ", f)

print("Checking AWS...")
check_jsdelivr("amazonwebservices")

print("\nChecking Microsoft...")
check_jsdelivr("microsoft")

print("\nChecking IBM...")
check_jsdelivr("ibm")
