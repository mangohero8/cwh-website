#!/bin/bash
# Download CAHL C player photos from Crossbar
# Run from the cwh-website root directory

mkdir -p public/images/players

echo "Downloading CAHL C player photos..."

# Players with actual photos
curl -sL -o public/images/players/albright-55.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/3a597cdf-71a9-4c6f-a241-614307477961.jpeg?versionId=POj4KC5pQ5rB3MZ4ptKH0eV_an7XjkdM"
echo "✓ Jaymes Albright (#55)"

curl -sL -o public/images/players/carpenter-27.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/e583ccf8-1002-4b0a-9e5a-5f0d73bc33f9.jpeg?versionId=KZKENmb8TZ7KclX6BgK.d9JUbjkvyAiF"
echo "✓ Robert Carpenter (#27)"

curl -sL -o public/images/players/hopkinson-10.jpg "https://crossbar.s3.amazonaws.com/players%2F1056822%2F2001214212341-1223422-420315-141210-122210212015231023310.jpg"
echo "✓ John Hopkinson (#10)"

curl -sL -o public/images/players/hoyt-6.jpg "https://crossbar.s3.amazonaws.com:443/organizations/212/uploads/a2c25180-e179-4a0a-83a2-dbc2161ee2ac.jpeg?versionId=_eB3IrKouQGROEtrbpBfxpz21yQpLCpw"
echo "✓ Douglas Hoyt (#6)"

curl -sL -o public/images/players/kattich.png "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/825ec309-9d3d-4dc8-80c7-cc1ed3bbdaef.png?versionId=ZJWWorrhZTP.vlAQ1fqkkxOXQVAQzAWf"
echo "✓ Kenzie Kattich"

curl -sL -o public/images/players/nocar-33.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/92d591f5-496a-435b-ac56-0d7a9a81048d.jpeg?versionId=BXaGXVHIlU55r5LRJe3jLpreToMreFyE"
echo "✓ TJ Nocar (#33)"

curl -sL -o public/images/players/rohr-37.jpg "https://crossbar.s3.amazonaws.com/players%2Ff9d22ae4-6b2f-429d-9e2e-72ec2fa427e3%2F5122220410233-223231-4221220-131210-12233201451023234315.jpg"
echo "✓ Eric Rohr (#37)"

curl -sL -o public/images/players/stanley-44.jpg "https://crossbar.s3.amazonaws.com/players%2Fc5e9109c-2bc8-401a-8342-571f1ad165da%2F1511422312222-23131512-415222-1220323-12205131235112211.jpg"
echo "✓ Sam Stanley (#44)"

curl -sL -o public/images/players/sullivan-12.jpg "https://crossbar.s3.amazonaws.com/players%2F51913%2F121523150005-25320-421222-13202220-0051312141023121322.jpg"
echo "✓ William Sullivan (#12)"

echo ""
echo "Done! Photos saved to public/images/players/"
ls -la public/images/players/

echo ""
echo "Downloading CAHL D player photos..."

curl -sL -o public/images/players/d-wbeltz-13.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/00f3de50-dd78-4e43-aecf-a76f60d88809.jpeg?versionId=K2Yup6t2FAI0PHrUylXEfY7BFh3cAV1W"
echo "✓ Wyatt Beltz (#13)"

curl -sL -o public/images/players/d-brown-92.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/3a8b4591-8d30-453c-bb1e-63dfdf741531.jpg?versionId=BY_qtI0BMX6ZABbnSNcnVdB7V_9deVqV"
echo "✓ James Brown (#92)"

curl -sL -o public/images/players/d-decicco-17.jpg "https://crossbar.s3.amazonaws.com/players%2F1052275%2F1311210232122-10232315-41210-15151420-20131312511141011020.jpg"
echo "✓ Taylor DeCicco (#17)"

curl -sL -o public/images/players/d-foster.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/a5522428-185a-4f59-b313-c42d5b264659.jpeg?versionId=y0LHi9By_W9hepRQU1AM3vSXifWC2e5o"
echo "✓ Aaron Foster"

curl -sL -o public/images/players/d-gambrel-97.jpg "https://crossbar.s3.amazonaws.com/players%2Fa8ce4d12-1b1e-43df-bc81-ba3f52a86d2d%2F22242313104-01310-4232014-1432213-215221112152051521511.jpg"
echo "✓ Allen Gambrel (#97)"

curl -sL -o public/images/players/d-haertling-83.jpg "https://crossbar.s3.amazonaws.com/players%2F7b9979a5-ff4e-4bf1-a000-7442b69c813d%2F221511415221413-123122-431514-15222012-10114201023114111512.jpg"
echo "✓ Veronica Haertling (#83)"

curl -sL -o public/images/players/d-kennedy.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2441/uploads/c31dc715-07d8-4d2a-bca8-3d6f44ea105f.jpg?versionId=lO2DsS3cwrTK0jJeKdOsZk0yJ7idXCAl"
echo "✓ Brian Kennedy"

curl -sL -o public/images/players/d-lopez-30.jpg "https://crossbar.s3.amazonaws.com/players%2F6be750b6-8015-4be1-8979-a3ad3e995466%2F151215520511-1521020-4231121-1452220-121231131101211153.jpg"
echo "✓ Alex Lopez (#30)"

curl -sL -o public/images/players/d-marshall-85.jpg "https://crossbar.s3.amazonaws.com/players%2Fd0782bf8-053f-4a35-8cbb-55f9912b7d88%2F0121215232302-121414-41242-15152020-4342014334130522.jpg"
echo "✓ Luke Marshall (#85)"

curl -sL -o public/images/players/d-walker.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/f64d2633-ab0b-4582-a7e0-334c9e72b38c.jpeg?versionId=Tg48BO6eiAoGTWeRSPzn_iDx4wUlQXT."
echo "✓ Leslie Walker"

curl -sL -o public/images/players/d-yeazel.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/7200df48-801d-4a06-b4b7-22ef8e0b5b08.jpg?versionId=m5lytXstuPWYhCEiw8rfgjiOzujWrAIj"
echo "✓ Ethan Yeazel"

echo ""
echo "All player photos downloaded!"
ls -la public/images/players/
