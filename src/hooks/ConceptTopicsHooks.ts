import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../axios";
import { ConceptTopic } from "../types";

export default function UseConceptTopics() {
  const conceptTopicsQuery =  useQuery({
    queryKey:["conceptTopics"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  });
  const concepts: ConceptTopic[] = conceptTopicsQuery.data;
  return concepts;
}

