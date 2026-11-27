import { CONTACT_EMAIL } from '../config'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 py-10">
      <div className="container-page flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Loop Lab. Handmade with care.</p>
        <p>
          Questions?{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  )
}
