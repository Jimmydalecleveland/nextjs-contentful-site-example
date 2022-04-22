export default function handler(_, res) {
  res.clearPreviewData()
  res.redirect('/')
}
