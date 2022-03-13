import * as contentful from "contentful"

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function ProductPage(props) {
  console.log(props)
  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticProps() {
  // Get data from headless CMS
  const product = await client.getEntry('1YtMHIy5o7i9PBoLKtfYTI')

  return {
    props: {
      ...product.fields
    },
  }
}
