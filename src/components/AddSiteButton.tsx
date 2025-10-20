// components/AddSiteButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSites } from "./site-context";

export default function AddSiteButton() {
  const [input, setInput] = useState("");
  const { addSite } = useSites();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus /> Add Site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new site</DialogTitle>
          <DialogDescription>
            Enter the URL of the website you want to monitor. You can add
            multiple sites and track their status in real time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center flex-col gap-3">
          <input
            type="url"
            placeholder="example.com"
            className="w-full rounded-md border p-2"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSite(input);
            }}
          />
          <Button
            variant="secondary"
            className="font-semibold"
            onClick={() => addSite(input)}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
