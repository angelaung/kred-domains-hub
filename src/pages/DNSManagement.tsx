import { useState } from "react";
import { useParams } from "react-router-dom";
import { Globe, Plus, Trash2, Save, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DNSRecord {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl: string;
}

const mockRecords: DNSRecord[] = [
  { id: "1", type: "A", name: "@", value: "185.199.108.153", ttl: "3600" },
  { id: "2", type: "CNAME", name: "www", value: "yourname.kred", ttl: "3600" },
  { id: "3", type: "MX", name: "@", value: "mail.yourname.kred", ttl: "3600" },
  { id: "4", type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
];

export default function DNSManagement() {
  const { domainId } = useParams();
  const [records, setRecords] = useState<DNSRecord[]>(mockRecords);
  const [newRecord, setNewRecord] = useState<Omit<DNSRecord, "id">>({
    type: "A",
    name: "",
    value: "",
    ttl: "3600",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const domain = "yourname.kred";

  const handleAddRecord = () => {
    if (!newRecord.name || !newRecord.value) {
      toast.error("Please fill in all fields");
      return;
    }

    const record: DNSRecord = {
      ...newRecord,
      id: Date.now().toString(),
    };

    setRecords([...records, record]);
    setNewRecord({ type: "A", name: "", value: "", ttl: "3600" });
    setShowAddForm(false);
    toast.success("DNS record added successfully!");
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    toast.success("DNS record deleted");
  };

  const handleSaveChanges = () => {
    toast.success("DNS changes saved! Propagation may take up to 24 hours.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            DNS <span className="gradient-text">Management</span>
          </h1>
          <p className="text-muted-foreground">
            Configure DNS records for {domain}
          </p>
        </div>

        <div className="space-y-6 animate-slide-up">
          {/* Status Banner */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">DNS is configured and active</p>
                <p className="text-muted-foreground">
                  Last updated: 2 hours ago • Nameservers: ns1.domains.kred, ns2.domains.kred
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DNS Records Table */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  DNS Records
                </CardTitle>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  variant="default"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Record Form */}
              {showAddForm && (
                <Card className="bg-muted/30 border-primary/20">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold">Add New DNS Record</h3>
                    <div className="grid md:grid-cols-5 gap-3">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={newRecord.type}
                          onValueChange={(value) =>
                            setNewRecord({ ...newRecord, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="AAAA">AAAA</SelectItem>
                            <SelectItem value="CNAME">CNAME</SelectItem>
                            <SelectItem value="MX">MX</SelectItem>
                            <SelectItem value="TXT">TXT</SelectItem>
                            <SelectItem value="NS">NS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="@, www, mail, etc."
                          value={newRecord.name}
                          onChange={(e) =>
                            setNewRecord({ ...newRecord, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Value</Label>
                        <Input
                          placeholder="IP address, hostname, etc."
                          value={newRecord.value}
                          onChange={(e) =>
                            setNewRecord({ ...newRecord, value: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>TTL</Label>
                        <Select
                          value={newRecord.ttl}
                          onValueChange={(value) =>
                            setNewRecord({ ...newRecord, ttl: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">5 min</SelectItem>
                            <SelectItem value="1800">30 min</SelectItem>
                            <SelectItem value="3600">1 hour</SelectItem>
                            <SelectItem value="86400">1 day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddRecord}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Record
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Records Table */}
              <div className="rounded-lg border border-border/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>TTL</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Badge variant="outline">{record.type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.name}
                        </TableCell>
                        <TableCell className="font-mono text-sm max-w-md truncate">
                          {record.value}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {record.ttl}s
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRecord(record.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveChanges} size="lg">
                  <Save className="h-5 w-5 mr-2" />
                  Save DNS Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-muted/30 border-border/40">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">DNS Propagation</p>
                  <p className="text-muted-foreground">
                    DNS changes can take up to 24-48 hours to propagate globally. During this time, some users may still see the old records.
                    You can check propagation status using tools like whatsmydns.net.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
