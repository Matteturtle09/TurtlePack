import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';

// Define the type for each member
interface Member {
  username: string;
  email: string;
  role: string;
}

// Define the props type for the component
interface MembersTableProps {
  members: Member[];
}

const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
  return (
    <Table>
      <TableCaption>A list of your team's members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">UserName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.email}>
            <TableCell className="font-medium">{member.username}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">Remove</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MembersTable;
