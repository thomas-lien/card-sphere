import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function UserTransactions() {
  const transactions = [
    {
      id: "1",
      date: "2025-04-15",
      type: "Purchase",
      card: "Starbucks",
      amount: 25.0,
      status: "Completed",
    },
    {
      id: "2",
      date: "2025-04-10",
      type: "Purchase",
      card: "Amazon",
      amount: 50.0,
      status: "Completed",
    },
    {
      id: "3",
      date: "2025-04-05",
      type: "Redemption",
      card: "Starbucks",
      amount: 5.75,
      status: "Completed",
    },
    {
      id: "4",
      date: "2025-04-01",
      type: "Transfer",
      card: "Target",
      amount: 100.0,
      status: "Completed",
    },
    {
      id: "5",
      date: "2025-03-28",
      type: "Purchase",
      card: "Apple",
      amount: 200.0,
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Transactions</h3>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Card</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.type === "Purchase"
                        ? "default"
                        : transaction.type === "Redemption"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.card}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
