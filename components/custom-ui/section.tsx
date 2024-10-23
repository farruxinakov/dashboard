"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import AlertModal from "@/components/modals/alert-modal";
import Container from "@/components/custom-ui/container";
import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SectionProps {
  children: React.ReactNode;
  title: string;
  description: string;
  label?: string | null;
  route?: string;
  replace?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  label,
  route,
  replace,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    if (label === "Удалить") {
      setIsOpen(true);
    } else {
      if (route) {
        router.push(route);
      }
    }
  };

  const onConfirm = async () => {
    if (route) {
      try {
        setIsLoading(true);

        await axios.delete(route);

        if (replace) {
          router.replace(replace);
        }
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-y-2">
                <Heading size="h1">{title}</Heading>
                <Paragraph variant="lead">{description}</Paragraph>
              </div>
              {label && (
                <Button
                  onClick={onClick}
                  variant={label === "Удалить" ? "destructive" : "default"}
                >
                  {label}
                </Button>
              )}
            </div>
            <Separator />
            {children}
          </div>
        </Container>
      </section>
      {label === "Удалить" && (
        <AlertModal
          disabled={isLoading}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default Section;
