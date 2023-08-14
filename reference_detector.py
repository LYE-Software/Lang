import os

files = []

def list_files(folder):
    for filename in os.listdir(folder):
        if filename.startswith('.'):
            continue
        if os.path.isdir(os.path.join(folder, filename)):
            list_files(os.path.join(folder, filename))
        else:
            files.append(os.path.join(folder, filename))

list_files('.')

files = [f[2:] for f in files]
files_and_contents = []

for f in files:
    try:
        with open(f) as f1:
            files_and_contents.append([f, f1.read(), []])
    except:
        files_and_contents.append([f, '', []])
    
for f in files_and_contents:
    for k in files_and_contents:
        if f[0] == k[0]:
            continue
        if f[0] in k[1]:
            files_links_to_dont_matter = ["index-old.html", "login.html", "library.html", "compatibility.html", "oldindex.html", "studyfromfiletemp.html", "reference_detector.py"]
            if k[0] in files_links_to_dont_matter:
                continue
            f[2].append(k[0])

files_and_contents.sort(key=lambda x: len(x[2]), reverse=True)
for f in files_and_contents:
    # dont delete snow.css, reference_detector.py, CNAME, 
    if f[0] in ["snow.css", "reference_detector.py", "CNAME"]:
        continue
    if len(f[2]) == 0:
        print(f[0])
        os.remove(f[0])