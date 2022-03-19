import * as contentful from "contentful"

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function ProductPage(props) {
  console.log(props)
  if (props.error) {
    return (
      <div>
        <h1>An Error occurred: </h1>
        <h2>{props.error}</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticPaths() {
  const products = await client
    .getEntries({
      content_type: 'productReview',
    })

  const paths = products.items.map(product => ({
    params: {
      slug: product.fields.productId
    }
  }))

  console.log("paths: ", paths)

  return {
    fallback: false,
    paths,
  }
}

export async function getStaticProps(context) {
  // Get data from headless CMS
  const product = await client
    .getEntries({
      content_type: 'productReview',
      limit: 1,
      "fields.productId": context.params.slug,
    })
  
  console.log("products: ", product)

  return {
    props: {
      error: !product.items.length 
        && `No product with id: ${context.params.slug}`,
      ...product?.items?.[0]?.fields
    },
  }
}
