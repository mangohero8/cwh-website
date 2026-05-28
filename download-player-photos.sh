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
