import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <EmptyState
        icon="alert"
        title="This page doesn't exist"
        message="The link may be broken or the page may have moved."
        action={
          <Link to="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}
