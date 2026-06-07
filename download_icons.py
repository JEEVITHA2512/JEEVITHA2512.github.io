import os
import urllib.request
import urllib.error

# Define the icons to download with fallback candidate URLs
# (Local Filename, [Candidate URLs])
ICONS_TO_DOWNLOAD = [
    # --- Tech Stack (SVGs) ---
    ("python.svg", [
        "https://cdn.simpleicons.org/python",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
    ]),
    ("tensorflow.svg", [
        "https://cdn.simpleicons.org/tensorflow",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg"
    ]),
    ("pytorch.svg", [
        "https://cdn.simpleicons.org/pytorch",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg"
    ]),
    ("langchain.svg", [
        "https://cdn.simpleicons.org/langchain"
    ]),
    ("rasa.svg", [
        "https://cdn.simpleicons.org/rasa"
    ]),
    ("mlflow.svg", [
        "https://cdn.simpleicons.org/mlflow"
    ]),
    ("microsoftazure.svg", [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
        "https://cdn.simpleicons.org/microsoftazure"
    ]),
    ("amazonwebservices.svg", [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        "https://cdn.simpleicons.org/amazonwebservices"
    ]),
    ("huggingface.svg", [
        "https://cdn.simpleicons.org/huggingface"
    ]),
    ("apachespark.svg", [
        "https://cdn.simpleicons.org/apachespark",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/apache/apache-original.svg"
    ]),
    ("fastapi.svg", [
        "https://cdn.simpleicons.org/fastapi",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg"
    ]),
    ("streamlit.svg", [
        "https://cdn.simpleicons.org/streamlit"
    ]),
    ("clickhouse.svg", [
        "https://cdn.simpleicons.org/clickhouse"
    ]),
    ("elasticsearch.svg", [
        "https://cdn.simpleicons.org/elasticsearch",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/elasticsearch/elasticsearch-original.svg"
    ]),
    ("opentelemetry.svg", [
        "https://cdn.simpleicons.org/opentelemetry"
    ]),
    ("databricks.svg", [
        "https://cdn.simpleicons.org/databricks",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/databricks/databricks-original.svg"
    ]),
    ("oracle.svg", [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg",
        "https://cdn.simpleicons.org/oracle"
    ]),
    ("google.svg", [
        "https://cdn.simpleicons.org/google",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg"
    ]),
    ("coursera.svg", [
        "https://cdn.simpleicons.org/coursera"
    ]),
    
    # --- Corporate Logos (PNGs via Hunter.io API / Custom URLs) ---
    ("microsoftfabric.png", [
        "https://davidalzamendi.com/wp-content/uploads/2023/05/Fabric_final_x256.png",
        "https://logos.hunter.io/microsoft.com"
    ]),
    ("microsoft.png", [
        "https://logos.hunter.io/microsoft.com"
    ]),
    ("ibm.png", [
        "https://logos.hunter.io/ibm.com"
    ]),
    ("cast-ai.png", [
        "https://logos.hunter.io/cast.ai"
    ]),
    ("dataiku.png", [
        "https://logos.hunter.io/dataiku.com"
    ]),
    ("cambridge.png", [
        "https://logos.hunter.io/cambridge.org"
    ]),
    ("iso.png", [
        "https://logos.hunter.io/iso.org"
    ]),
]

def download_file(url, filepath):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            with open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        return True
    except urllib.error.URLError as e:
        return False
    except Exception as e:
        return False

def main():
    target_dir = os.path.join("public", "icons")
    
    # Create public/icons directory if it doesn't exist
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        print(f"Created directory: {target_dir}")
    else:
        print(f"Directory already exists: {target_dir}")
        
    print(f"Starting download of {len(ICONS_TO_DOWNLOAD)} logos...")
    success_count = 0
    
    for filename, urls in ICONS_TO_DOWNLOAD:
        filepath = os.path.join(target_dir, filename)
        downloaded = False
        
        for url in urls:
            if download_file(url, filepath):
                print(f"[OK] Downloaded {filename} from {url}")
                downloaded = True
                break
                
        if downloaded:
            success_count += 1
        else:
            print(f"[FAILED] Could not download {filename} from any candidates: {urls}")
            
    print(f"\nDownload finished: {success_count}/{len(ICONS_TO_DOWNLOAD)} logos saved successfully.")

if __name__ == "__main__":
    main()
