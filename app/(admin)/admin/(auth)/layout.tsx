import {
  HomeIcon,
  NewspaperIcon,
  CubeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import ClientSideLink from "../client-side-link";

const navItems = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  { name: "About", href: "/admin/about", icon: UserGroupIcon },
  { name: "News", href: "/admin/news", icon: NewspaperIcon },
  { name: "Projects", href: "/admin/projects", icon: CubeIcon },
  { name: "Contact", href: "/admin/contact", icon: EnvelopeIcon },
  { name: "Careers", href: "/admin/careers", icon: BriefcaseIcon },
  { name: "Accreditation", href: "/admin/accreditation", icon: CheckBadgeIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex-1 px-3 py-4">
          <div className="mb-6 px-4">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <ClientSideLink key={item.href} href={item.href} name={item.name} icon={<Icon className="h-5 w-5" />} />
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="px-3 py-4 border-t border-gray-200">
          <ClientSideLink
            href="/api/auth/signout"
            name="Logout"
            icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
