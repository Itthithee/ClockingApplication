import React, { cloneElement } from "react"
import {SearchProvider} from "./SearchStore"
import {ClockingProvider} from "./ClockingStore"

function ProviderComposer({ contexts, children } : {contexts: React.ReactElement[], children: React.ReactElement}){
  return contexts.reduce(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids
      }),
    children
  )
}
export default function ContextProvider({ children } : {children: React.ReactElement}){
  return (
    <ProviderComposer
      // add providers to array of contexts
      contexts={[<SearchProvider />, <ClockingProvider />]}
    >
      {children}
    </ProviderComposer>
  )
}