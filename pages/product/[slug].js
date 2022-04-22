import PreviewBanner from "../../components/PreviewBanner"
import * as contentful from "../../utils/contentful"

export default function ProductPage(props) {
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
      {props.preview && <PreviewBanner />}
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticPaths() {
  const products = await contentful.client
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
  console.log("context: ", context)
  // Get data from headless CMS
  const client = context.preview
    ? contentful.previewClient
    : contentful.client

  const product = await client
    .getEntries({
      content_type: 'productReview',
      limit: 1,
      "fields.productId": context.params.slug,
    })

  return {
    props: {
      preview: context.preview || false,
      error: !product.items.length
        && `No product with id: ${context.params.slug}`,
      ...product?.items?.[0]?.fields
    },
  }
}
