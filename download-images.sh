#!/bin/bash
# Downloads all images from Crossbar S3 for self-hosting
# Run this once after cloning the repo

mkdir -p public/images
cd public/images

echo "Downloading CWH images from Crossbar..."

curl -sL -o logo.png "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/8fddb9cb-73f9-4192-9a51-a40c3e7a1c0b.png?versionId=tysKQ08ZOHJ9rd02sm_YGUHQzUmB6_W6"
echo "✓ logo.png"

curl -sL -o hero.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/6798ff43-2e86-4339-8789-14d456a11c3d.jpg?versionId=2yO1Ie5H411iIxbFj31PscJYg2d7qLoT"
echo "✓ hero.jpg"

curl -sL -o sponsors-all.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/5317a254-a026-4687-8718-5940a6c6ebcc.jpg?versionId=uvnR9_fawpEqIAt7N.4pDfRTIvwXlCqV"
echo "✓ sponsors-all.jpg"

curl -sL -o usahockey.png "https://crossbar.org/static/images/usahockey.png"
echo "✓ usahockey.png"

curl -sL -o midam.png "https://crossbar.s3.amazonaws.com/images/affiliates/midam_hockey.png"
echo "✓ midam.png"

curl -sL -o kroger.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/4279bed0-c4d2-48a8-9955-9f4b60af424b.jpg?versionId=rBsqEQlRX09tHd6EiqQlrEhWqwymbKYB"
echo "✓ kroger.jpg"

curl -sL -o moomoo.png "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/60b85a42-824c-4a7e-bbb6-22b869113522.png?versionId=fdE6ULWDuD5E4B_wZRqM6mLKhLfHCKBV"
echo "✓ moomoo.png"

curl -sL -o chiller.png "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/909b2ed2-837a-4f15-b652-8b964ceaf4f4.png?versionId=V4lRcHYnLKX25gTfncVygQxnc16QJT_D"
echo "✓ chiller.png"

curl -sL -o guardians-cup.jpg "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/48817466-72a2-4b53-b485-219aa7a4a382.jpg?versionId=V1idXI2ty31Sn.33FSZs3TZCEB9S6Lyu"
echo "✓ guardians-cup.jpg"

curl -sL -o taylor.webp "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/0e0069d5-46af-4cd8-ab39-e01f34efdc01.webp?versionId=QDLKlnFoPEIeGsE_6ksol2dwIBmkPMkh"
echo "✓ taylor.webp"

curl -sL -o tj.webp "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/d679091e-1aba-427d-8e79-5bac74e14a5d.webp?versionId=MWI_E5Ddbs83QGv7x.r1tAyhp5r3yn1."
echo "✓ tj.webp"

curl -sL -o matt.webp "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/e4fe7d4a-270f-4f0f-af84-c110ff104599.webp?versionId=7.5Y.LilMfVcFbYiVq5IBn0MyL6YmN2y"
echo "✓ matt.webp"

curl -sL -o steven.webp "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/d511648b-3f44-4a0f-bdcc-cff15d628d66.webp?versionId=SDSEtg9nxdks2jhH_xXBG7kHrlCjks5x"
echo "✓ steven.webp"

curl -sL -o brent.webp "https://crossbar.s3.amazonaws.com:443/organizations/2117/uploads/735f4e01-b545-48c9-9160-9590ec265343.webp?versionId=Uf1YH1sm5ypWWs2LDxitiRm508GNQ0In"
echo "✓ brent.webp"

echo ""
echo "Done! All images saved to public/images/"
ls -la
