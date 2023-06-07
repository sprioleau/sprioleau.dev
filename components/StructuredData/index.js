/* eslint-disable react/no-danger */

function StructuredData({ data }) {
  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
}

export default StructuredData;
