const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const make = (children) =>
  function Icon(props) {
    return (
      <svg {...base} {...props}>
        {children}
      </svg>
    );
  };

export const HomeIcon = make(
  <>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </>
);
export const ListIcon = make(
  <>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </>
);
export const PlusIcon = make(<path d="M12 5v14M5 12h14" />);
export const LogoutIcon = make(
  <>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </>
);
export const SearchIcon = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </>
);
export const EditIcon = make(
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </>
);
export const TrashIcon = make(
  <>
    <path d="M3 6h18" />
    <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
  </>
);
export const XIcon = make(<path d="M18 6L6 18M6 6l12 12" />);
export const CheckIcon = make(<path d="M20 6L9 17l-5-5" />);
export const AlertIcon = make(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </>
);
export const ArrowUpIcon = make(<path d="M12 19V5M5 12l7-7 7 7" />);
export const ArrowDownIcon = make(<path d="M12 5v14M19 12l-7 7-7-7" />);
export const WalletIcon = make(
  <>
    <path d="M20 7H5a2 2 0 010-4h13v4z" />
    <path d="M3 5v14a2 2 0 002 2h15V7" />
    <path d="M16 14h.01" />
  </>
);
export const ReceiptIcon = make(
  <>
    <path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2V3z" />
    <path d="M9 8h6M9 12h6" />
  </>
);
export const ChevronLeftIcon = make(<path d="M15 18l-6-6 6-6" />);
export const ChevronRightIcon = make(<path d="M9 18l6-6-6-6" />);
export const InboxIcon = make(
  <>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5.1L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0016.7 4H7.3a2 2 0 00-1.8 1.1z" />
  </>
);

export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B3B36" />
      <rect x="8" y="16" width="4" height="9" rx="1" fill="#F7F8FA" />
      <rect x="14" y="11" width="4" height="14" rx="1" fill="#34B58F" />
      <rect x="20" y="7" width="4" height="18" rx="1" fill="#F7F8FA" />
    </svg>
  );
}
