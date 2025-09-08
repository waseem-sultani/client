import React, { useMemo, useState } from "react";
import { IIssue } from "../../utils/interfaces";
import styles from "./issues.module.css";

interface IIssueProp {
  issues: IIssue[];
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalIssues: number;
  isAssigned: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: (id: string | undefined) => Promise<void>;
}

const Issues: React.FC<IIssueProp> = ({
  issues,
  page,
  rowsPerPage,
  totalIssues,
  totalPages,
  setPage,
  setRowsPerPage,
  handleDelete,
  isAssigned,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const handleNextPage = () => {
    setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    setPage((p) => p - 1);
  };

  const filteredIssues = useMemo(() => {
    let data = [...issues];

    if (search) {
      data = data.filter(
        (issue) =>
          issue.title.toLowerCase().includes(search.toLowerCase()) ||
          issue.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((issue) => issue.status === statusFilter);
    }
    if (priorityFilter) {
      data = data.filter((issue) => issue.priority === priorityFilter);
    }

    if (sortBy === "title") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "priority") {
      data.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (sortBy === "status") {
      data.sort((a, b) => a.status.localeCompare(b.status));
    }

    return data;
  }, [issues, search, statusFilter, priorityFilter, sortBy]);

  return (
    <div className={styles.issues}>
      <h2 className={styles.title}>
        {!isAssigned
          ? `My Issues ${totalIssues}`
          : `Assigned Issues ${totalIssues}`}
      </h2>

      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search issues"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />

        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className={styles.select}
          value={priorityFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriorityFilter(e.target.value)
          }
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className={styles.select}
          value={sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value)
          }
        >
          <option value="title">Sort by Title</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <p className={styles.noData}>No issues found</p>
      ) : (
        <ul className={styles.list}>
          {filteredIssues.map((issue) => (
            <li key={issue._id} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>{issue.title}</h3>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(issue?._id)}
                  aria-label="Delete issue"
                >
                  ×
                </button>
              </div>
              <p className={styles.description}>
                {issue.description || "No description"}
              </p>
              <div className={styles.meta}>
                <span className={styles.status}>
                  Status: {issue.status || "No status"}
                </span>
                <span className={styles.priority}>
                  Priority: {issue.priority || "No priority"}
                </span>
                <span className={styles.assignee}>
                  {isAssigned
                    ? `Assigned by: ${
                        issue &&
                        typeof issue.userId !== "string" &&
                        issue.userId?.name
                          ? issue.userId.name
                          : "Unassigned"
                      }`
                    : `Assigned to: ${
                        typeof issue?.assignee === "string"
                          ? "Unassigned"
                          : issue?.assignee?.name || "Unassigned"
                      }`}
                </span>
              </div>
              {issue.tags?.length > 0 && (
                <div className={styles.tags}>
                  {issue.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <span className={styles.pageInfo}>
          Page {page} of {totalPages || 1}
        </span>
        <button
          className={styles.pageBtn}
          disabled={page === totalPages || totalPages === 0}
          onClick={handleNextPage}
        >
          Next
        </button>

        <select
          value={rowsPerPage}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(1);
          }}
          className={styles.select}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </select>
      </div>
    </div>
  );
};

export default Issues;
