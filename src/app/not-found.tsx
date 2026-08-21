import Link from "next/link";
import clsx from "clsx";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={clsx("container my-4", styles.wrap)}>
      <h1>Page not found</h1>
      <p>No Drupal content matched this path.</p>
      <Link href="/">Back to home</Link>
    </div>
  );
}
