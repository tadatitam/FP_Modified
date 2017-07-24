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
