"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import SeiLayout from "@/app/layouts/seiLayout";

export default function Stake() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");

  const validators = [
    {
      name: "Flipside",
      commission: "5.00%",
      delegatorShares: "288,563,264,507,818",
      apr: "3.55%",
    },
    {
      name: "Hype INFRA",
      commission: "5.00%",
      delegatorShares: "269,977,717,444,970",
      apr: "3.55%",
    },
    {
      name: "Figment",
      commission: "5.00%",
      delegatorShares: "260,671,344,659,066",
      apr: "3.55%",
    },
    {
      name: "Chorus One",
      commission: "5.00%",
      delegatorShares: "260,019,610,043,844",
      apr: "3.55%",
    },
    {
      name: "RHINO",
      commission: "5.00%",
      delegatorShares: "249,808,335,722,596",
      apr: "3.55%",
    },
  ];

  return (
    <SeiLayout>
      <div>
        <div className=" border-b pb-4 border-gray-200">
          <div className="flex px-8 items-center gap-1">
            <img
              src="/sei-images/download (6).svg"
              alt="Sei Logo"
              className="w-6 h-6 lg:block hidden "
            />
            <h1 className="text-2xl font-semibold lg:pl-0 pl-4  ">Stake</h1>
          </div>
        </div>
        <div className="mb-6 px-8 mt-6">
          <div>
            <div className="text-2xl font-semibold">Your Validators</div>
          </div>
          <div className="border border-gray-200 rounded-md mt-3">
            {!isWalletConnected ? (
              <div className="text-center py-8">
                <p className="mt-4 text-muted-foreground mb-4">
                  Connect your wallet to view your staked validators
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setIsWalletConnected(true)}
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <p>Your staked validators will appear here.</p>
            )}
          </div>
        </div>
        <div className="px-8 pt-6">
          <div>
            <div className="text-2xl font-semibold">All Validators</div>
          </div>
          <div className="mt-4">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average APR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.73%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Validators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">39</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Bonded Tokens Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">65.48%</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex">
              <div className="bg-gray-200 flex items-center my-4 p-1 rounded-lg">
                <div
                  onClick={() => setActiveTab("Active")}
                  className={`px-4 py-1 rounded-lg text-black ${
                    activeTab === "Active" && "bg-white"
                  }`}
                >
                  Active
                </div>
                <div
                  onClick={() => setActiveTab("Inactive")}
                  className={`px-4 py-1 rounded-lg text-black ${
                    activeTab === "Inactive" && "bg-white"
                  }`}
                >
                  Inactive
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-100  ">
                  <TableRow className="py-3">
                    <TableHead className="text-black py-3 font-semibold">
                      Validators
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Commission
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Delegator Shares
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      APR
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validators.map((validator, index) => (
                    <TableRow
                      className={`${index % 2 && "bg-gray-200"} py-7`}
                      key={index}
                    >
                      <TableCell className="font-[500] cursor-pointer text-[16px] text-[#8B1E17] py-5">
                        <Link href="/stake/dynamic-route">
                          {validator.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-[16px] font-light">
                        {validator.commission}
                      </TableCell>
                      <TableCell className="text-[16px] font-light">
                        {validator.delegatorShares}
                      </TableCell>
                      <TableCell className="text-[16px] font-light">
                        {validator.apr}
                      </TableCell>
                      <TableCell className="text-[16px] font-light">
                        <Button variant="secondary" size="sm">
                          Stake
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page
                </span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeiLayout>
  );
}
