/// <reference types="react" />

interface ExpandableProperties {
  title: string;
  collapsed?: boolean;
}

interface ExpandableStatic
  extends React.ClassicComponentClass<ExpandableProperties> {}

declare var Expandable: ExpandableStatic;

export default Expandable;
