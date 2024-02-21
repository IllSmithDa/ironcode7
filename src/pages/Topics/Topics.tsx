import React from 'react';
import {
  useParams,
} from "react-router-dom";

export default function Topics() {
  const { topicId } = useParams<"topicId">();
  return (
    <div>{topicId}</div>
  )
}
