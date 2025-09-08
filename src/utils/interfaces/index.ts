export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  _id: string;
}

interface IAssignee {
  name: string;
}

export interface IIssue {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string | IAssignee;
  tags: string[];
  _id?: string;
  userId?: IAssignee;
}
