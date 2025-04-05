"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface AccountsTableProps extends ComponentProps<"div"> {
  accounts: Account[];
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export const AccountsTable = ({ accounts, className }: AccountsTableProps) => {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatAccountNumber = (accountNumber: string) => {
    return `•••• •••• •••• ${accountNumber.slice(-4)}`;
  };

  const formatAmount = (amount: number, currency: Currency) => {
    return ` ${amount.toLocaleString()} ${CURRENCY_SYMBOLS[currency]}`;
  };

  const viewAccountDetails = (account: Account) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className={className}>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер счета</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Валюта</TableHead>
                <TableHead className="text-right">Баланс</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow
                  key={account.Account}
                  onClick={() =>
                    router.push(`/accounts/${account.AccountGuid}`)
                  }
                >
                  <TableCell className="font-medium">
                    {formatAccountNumber(account.Account)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        account.AccountState === "Открыт"
                          ? "bg-green-500"
                          : "bg-red-500",
                      )}
                    >
                      {account.AccountState}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{account.Currency}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatAmount(account.Balance, account.Currency)}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewAccountDetails(account);
                      }}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Детали счета</DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Номер счета</div>
                <div className="text-sm">{selectedAccount.Account}</div>

                <div className="text-sm font-medium">Статус</div>
                <Badge
                  className={cn(
                    "w-fit",
                    selectedAccount.AccountState === "Открыт"
                      ? "bg-green-500"
                      : "bg-red-500",
                  )}
                >
                  {selectedAccount.AccountState}
                </Badge>

                <div className="text-sm font-medium">Валюта:</div>
                <div className="text-sm">{selectedAccount.Currency} </div>

                <div className="text-sm font-medium">Баланс:</div>
                <div className="text-sm font-bold">
                  {formatAmount(
                    selectedAccount.Balance,
                    selectedAccount.Currency,
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
