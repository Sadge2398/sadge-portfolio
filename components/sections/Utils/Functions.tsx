export const handleGoBack = () => {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.scrollIntoView({
      block: 'center'
    });
  }
};

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 transition-colors hover:text-purple-300"
    >
      {label}
    </a>
  );
}