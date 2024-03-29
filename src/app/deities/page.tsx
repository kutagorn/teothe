"use client";

import { Card, Divider, Skeleton } from "antd";
import Deity from "Comp/commonlore/Deities";
import GetCrumbs from "Comp/NavigationCrumb";
import SimpleContent from "Comp/SimpleCon";
import useSWR from "swr";

interface DataType {
  deityDomains: string;
  deityTitle: string;
  deityName: string;
  deityText: string;
  deityId: number;
}

/**
 * Gets Deity data and passes the props to Deity component
 * @see Deity
 * @generator
 * @param rank The deity rank as string
 * @returns Deity component array
 */
function GetDeities(rank: string) {
  /**
     * Fetcher function for API requests.
     * @param args - RequestInfo object containing information about the request.
     * @returns Promise resolving to the parsed JSON response.
     */
    const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://gi5vwiheg0.execute-api.eu-central-1.amazonaws.com/Stage/getDeities",
    fetcher
  );
  if (error) {
    console.log(error);
    return <div>Failed to access API</div>;
  }
  if (!data) return <Skeleton active />;

  data.sort((a: DataType, b: DataType) => a.deityId - b.deityId);

  let renderedDeities = [];
  for (let item of data) {
    if (item.deityTitle === rank) {
      renderedDeities.push(
        <Deity
          imageSrc={"./Deities/" + item.deityName + ".png"}
          descriptionProps={{
            title: item.deityName,
            body: item.deityText,
            domain: item.deityDomains,
          }}
        />
      );
    }
  }
  return renderedDeities;
}

/**
 * Categorizes and displays deities with text describing each category
 * @returns SimpleContent and GetDeities response wrapped with Card(antd) in section
 */
export default function DeitiesPage() {
  return (
    <section>
      <GetCrumbs path={"Teothe3K,Deities"} />
      <Card bordered={false} className="w-full">
        <SimpleContent
          contentProps={{
            title: "Overdeities",
          }}
        />
        {GetDeities("Over")}
        <Divider />
        <SimpleContent
          contentProps={{
            title: "Greater Deities",
            text: [
              "Worshipped by about a million of people. They know what is going to happen a week ahead, regardless. They can create artifacts. So strong, you cant really challenge them. In most cases, worshippers don't even get to see them. Avatars of these gods are carrying a fraction of their power. Up to ten avatars can be created. Destroying one doesn't even damage since they can summon another one. An avatar is as strong as a lesser deity. For these reasons, lower ranked gods join to greater ones.",
            ],
          }}
        />
        {GetDeities("Greater")}
        <Divider />
        <SimpleContent
          contentProps={{
            title: "Higher Deities",
            text: [
              "Worshipped by about 100000 people. They know what is happening, regardless.",
            ],
          }}
        />
        {GetDeities("Higher")}
        <Divider />
        <SimpleContent
          contentProps={{
            title: "Lesser Deities",
            text: ["Worshipped by about 10000 people."],
          }}
        />
        {GetDeities("Lesser")}
        <Divider />
        <SimpleContent
          contentProps={{
            title: "Demi Deities",
            text: ["Worshipped by about 100-1000 people."],
          }}
        />
        {GetDeities("Demi")}
      </Card>
    </section>
  );
}
