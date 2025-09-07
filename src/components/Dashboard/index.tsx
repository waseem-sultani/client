import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getAllUsers, handleLogout } from "../../services/user";
import styles from "./dashboard.module.css";
import { IIssue, IUser } from "../../utils/interfaces";
import { DashboardSchema } from "../../utils/yupSchema";
import { handleCreateIssue } from "../../services/issues";
import { Link } from "react-router-dom";

const initialValues: IIssue = {
  title: "",
  description: "",
  status: "",
  priority: "",
  assignee: "",
  tags: [],
};

const Dashboard: React.FC<{ setUser: React.Dispatch<any> }> = ({ setUser }) => {
  const [tag, setTag] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  const logout = async () => {
    await handleLogout();
    setUser(null);
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: DashboardSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (vals) => {
      await handleCreateIssue(vals);
      resetForm();
    },
  });

  const addTag: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const t = tag.trim();
      if (!t) return;

      if (!values.tags.includes(t)) {
        setFieldValue("tags", [...values.tags, t]);
      }

      setTag("");
    }
  };

  const removeTag = (t: string) => {
    const tags = values.tags.filter((tag) => tag !== t);
    setFieldValue("tags", tags);
  };

  const getUsers = async () => {
    const users = await getAllUsers();
    setUsers(users?.users);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleReset = () => {
    resetForm();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={logout}
        >
          Logout
        </button>
        <Link to="/issues" className={styles.issuesLink}>
          My Issues
        </Link>
        <Link to="/assignedIssues" className={styles.issuesLink}>
          Assigned Issues
        </Link>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Add title"
            className={styles.formInput}
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className={styles.formError}>{errors.title}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Add Description"
            className={styles.formTextarea}
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className={styles.formError}>{errors.description}</div>
          )}
        </div>

        <div className={styles.formRow}>
          <select
            id="priority"
            name="priority"
            className={styles.formSelect}
            value={values.priority}
            onChange={handleChange}
          >
            <option value="">Select priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <select
            id="status"
            name="status"
            className={styles.formSelect}
            value={values.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.tagLabel} htmlFor="tags">
            Tags
          </label>
          <div className={styles.tags}>
            {values.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
                <button
                  type="button"
                  className={styles.tagClose}
                  onClick={() => removeTag(t)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              id="tags"
              type="text"
              className={styles.tagsInput}
              placeholder="Type and press Enter"
              value={tag}
              onChange={handleTagChange}
              onKeyDown={addTag}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="assignee">
            Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            className={styles.formSelect}
            value={values.assignee as string}
            onChange={handleChange}
          >
            <option value="">Select assignee</option>
            {users?.map((user) => (
              <option value={user?._id}>{user?.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btn}>
            Save
          </button>
          <button
            type="submit"
            className={styles.btnReset}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
