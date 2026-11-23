import styles from "@/components/blogs/BlogsListing.module.scss";
import loaderStyles from "@/components/Loader/NavigationLoader.module.scss";

export default function BlogsLoading() {
  return (
    <div className={styles.page}>
      <div className={loaderStyles.topBar} role="progressbar" aria-label="Loading blogs" />
      <div className={loaderStyles.spinnerContainer}>
        <div className={loaderStyles.spinner} />
        <span>Loading blogs…</span>
      </div>

      <div className="container">
        <div style={{ height: "2rem", width: "12rem", background: "#f0f0f0", borderRadius: "4px", marginBottom: "2.4rem" }} />
        <div style={{ height: "4.8rem", width: "32rem", background: "#e0e0e0", borderRadius: "8px", marginBottom: "4rem" }} />

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div style={{ height: "4.4rem", background: "#f0f0f0", borderRadius: "50vw", marginBottom: "3.2rem" }} />
            <div style={{ height: "2.4rem", width: "14rem", background: "#e0e0e0", borderRadius: "4px", marginBottom: "1.6rem" }} />
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{ height: "3.6rem", background: "#f5f5f5", borderRadius: "6px", marginBottom: "0.8rem" }} />
            ))}
          </aside>

          <div className={styles.content}>
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                  <div style={{ aspectRatio: "16 / 10", background: "#eaeaea", borderRadius: "2.2rem" }} />
                  <div style={{ height: "2rem", width: "40%", background: "#f0f0f0", borderRadius: "4px" }} />
                  <div style={{ height: "2.4rem", width: "90%", background: "#e0e0e0", borderRadius: "4px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
