import * as contentful from "../../utils/contentful"

export default async function handler(req, res) {
  const { secret, productId } = req.query
  console.log("productId: ", productId)

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !productId) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const product = await contentful.client
    .getEntries({
      content_type: 'productReview',
      limit: 1,
      "fields.productId": productId,
    })

  if (!product.items.length) {
    return res.status(401).json({ message: 'Invalid productId' })
  }

  const pageFields = product.items[0].fields

  res.setPreviewData({})
  res.redirect(`/product/${pageFields.productId}`)
}
