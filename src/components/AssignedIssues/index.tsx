import React, { useCallback, useEffect, useState } from "react";
import { IIssue } from "../../utils/interfaces";
import { deleteIssue, getAssignedIssues } from "../../services/issues";
import Issues from "../Issues";

const AssignedIssues: React.FC = () => {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalIssues, setTotalIssues] = useState<number>(1);

  const getAllIssues = useCallback(async () => {
    const issues = await getAssignedIssues(page, rowsPerPage);
    setIssues(issues?.issues || []);
    const pages = Math.ceil(issues?.total / rowsPerPage);
    setTotalPages(pages);
    setTotalIssues(issues?.total);
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string | undefined) => {
    await deleteIssue(id as string);
    await getAllIssues();
  };

  useEffect(() => {
    getAllIssues();
  }, [getAllIssues]);

  return (
    <Issues
      page={page}
      rowsPerPage={rowsPerPage}
      issues={issues}
      handleDelete={handleDelete}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      totalIssues={totalIssues}
      totalPages={totalPages}
      isAssigned={true}
    />
  );
};

export default AssignedIssues;
