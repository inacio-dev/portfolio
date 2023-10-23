export function dataLayerPushSelectContent(content_id: string, content_type: string) {
  window.dataLayer.push({
    content_id,
    content_type,
    event: 'select_content',
  })
}
