import Link from 'next/link'

function PreviewBanner() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4rem',
        width: '100%',
        height: '40px',
        background: 'black',
        color: 'white',
        fontSize: '14px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>PREVIEW MODE ENABLED</span>
      <Link
        prefetch={false}
        href="/api/cancel-preview"
      >
        <a
          style={{
            background: 'white',
            color: 'black',
            borderRadius: '3px',
            textDecoration: 'none',
            padding: '0.2rem 0.5rem',
          }}
        >
          EXIT PREVIEW MODE
        </a>
      </Link>
    </div>
  )
}

export default PreviewBanner
