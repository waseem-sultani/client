import { issueInstance } from "../../apiInstances";
import { IIssue } from "../../utils/interfaces";

export const handleCreateIssue = async (data: IIssue) => {
  try {
    const response = await issueInstance.post("/post-issue", data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const getCreatedIssues = async (noOfPages: number, noOfRows: number) => {
  try {
    const response = await issueInstance.get("/get-issues", {
      params: { noOfPages, noOfRows },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const deleteIssue = async (issueId: string) => {
  try {
    const response = await issueInstance.delete(`/delete-issue/${issueId}`);
    if (response.status === 200) {
      return response;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const getAssignedIssues = async (
  noOfPages: number,
  noOfRows: number
) => {
  try {
    const response = await issueInstance.get("/get-assigned-issues", {
      params: { noOfPages, noOfRows },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const updateIssue = async (id: string, vals: any) => {
  try {
    const response = await issueInstance.get("/get-assigned-issues", {
      params: { id, vals },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};
