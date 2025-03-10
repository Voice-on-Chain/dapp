import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface PathProps {
  href: string;
  label: string;
}

interface Props {
  basePath?: PathProps;
  prevPaths?: PathProps[];
  activePath: string;
}

const RBreadcrumb = ({ basePath, prevPaths, activePath }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="text-base lg:text-s20 capitalize text-dark-gray font-medium"
          >
            <Link href={basePath?.href || "/communities"}>
              {basePath?.label ?? "Communities"}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-base lg:text-s20 text-dark-gray font-medium">
          /
        </BreadcrumbSeparator>
        {/* previous paths begin */}
        {prevPaths?.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-base lg:text-s20 capitalize text-dark-gray font-medium"
              >
                <Link href={path?.href}>{path?.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-base lg:text-s20 font-medium text-dark-gray">
              /
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}

        {/* previous paths end */}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base capitalize lg:text-s20 font-medium text-mako">
            {activePath}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RBreadcrumb;
