import salesJson from "./Sales.json";

const transformDatatoNodes = (data: any) => {
  const nodes: any = [];
  const addNodes = (
    category: any,
    parentYAxis: number,
    parentYXAxis: number
  ) => {
    const categoryNode: any = {
      id: category.name,
      type: "custom",
      data: {
        inputWidth: category.value,
        maxWidth: data.saleReport.value,
        text: category.name,
      },
      position: { x: parentYXAxis, y: parentYAxis },
    };
    nodes.push(categoryNode);

    if (category.subCategories) {
      category.subCategories.forEach((subCategory: any, i: number) => {
        const len = subCategory.subCategories
          ? subCategory.subCategories.length
          : 1;
        const offset = i % 2 != 0 ? (i / 2 + 1) * 40 : -((i + 1) / 2) * 40;
        addNodes(subCategory, parentYAxis + offset * len, parentYXAxis + 200);
      });
    }
  };

  data.Category.forEach((category: any, i: number) => {
    const len = category.subCategories ? category.subCategories.length : 1;
    const offset = i % 2 != 0 ? (i / 2 + 1) * 30 : -((i + 1) / 2) * 30;
    addNodes(category, offset * len, 100);
  });

  return nodes;
};
const categoryNodes = transformDatatoNodes(salesJson);
console.log(categoryNodes);

export const initNodes = [
  {
    id: salesJson.saleReport.name,
    type: "custom",
    data: {
      inputWidth: salesJson.saleReport.value,
      maxWidth: salesJson.saleReport.value,
      text: salesJson.saleReport.name,
    },
    position: { x: -100, y: 0 },
  },
  ...categoryNodes,
];

function generateEdges(jsonData: any) {
  const edges: { id: string; source: string; target: string }[] = [];
  for (const category of jsonData.Category) {
    edges.push({
      id: `${jsonData.saleReport.name}-${category.name}`,
      source: `${jsonData.saleReport.name}`,
      target: category.name,
    });
    if (category.subCategories) {
      edges.push(
        ...generateEdgesForSubcategories(category.subCategories, category.name)
      );
    }
  }

  return edges;
}
function generateEdgesForSubcategories(
  subCategories: any,
  parentCategoryName: any
) {
  const edges: { id: string; source: string; target: string }[] = [];
  for (const subCategory of subCategories) {
    edges.push({
      id: `${parentCategoryName}-${subCategory.name}`,
      source: parentCategoryName,
      target: subCategory.name,
    });
    if (subCategory.subCategories) {
      edges.push(
        ...generateEdgesForSubcategories(
          subCategory.subCategories,
          subCategory.name
        )
      );
    }
  }
  return edges;
}

export const initEdges = generateEdges(salesJson);
