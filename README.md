# Summary
This project aims to collect fingerprints from the user's browser as inclusive as possible.
Its fingerprinting tests come from Fingerprint Central, Panopticlick and some of our own.
Credit to:
[Fingerprint Central](https://github.com/plaperdr/fp-central)
[Panopticlick](https://github.com/EFForg/panopticlick-python)

## Local installation
The only way to launch the project is through the **run.py** script.

Creation of your virtual environment

Local installation of packages through pip

    pip3 install -r requirements.txt

After this step, you can directly run

    python run.py

By default, the website is launched on port 5000.

    http://127.0.0.1:5000

Summary report of the user's browser is stored at ./outputs/.

## General structure
run.py is the major execution file. It, at the same time, makes calls to /static/js/clientAPI.js.

templates dir contains all the html files. Only base.html and fp.html are used here.

fingerprint dir is the most important folder that contains all fp tests. All added tests are placed in
fingerprint/attribute/standard/js/. To add a new test, both new-test.json and new-test.js need to be 
included. 

