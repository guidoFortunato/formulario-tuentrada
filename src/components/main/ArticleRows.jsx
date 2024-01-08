import { ArticleAccordion } from "./ArticleAccordion";
import { ArticleButtons } from "./ArticleButtons";
import { ArticleImages } from "./ArticleImages";
import { RichText } from "./RichText";

export const ArticleRows = ({ item }) => {
  const columns = item.columns;
  return (
    <section
      className={`grid 
        ${item.width === "100%" && "grid-cols-1 gap-4"} 
        ${item.width === "50%-50%" && "grid-cols-1 md:grid-cols-2 md:gap-4"} 
        ${item.width === "33%-33%-33%" && "grid-cols-1 lg:grid-cols-3 lg:gap-6"}
        ${
          item.width === "25%-25%-25%-25%" && 
          "grid-cols-1  lg:grid-cols-4 lg:gap-4"
          // md:grid-cols-2
        } 
        ${
          (item.width === "25%-75%" || item.width === "75%-25%") &&
          "grid-cols-1 lg:grid-cols-3 lg:gap-4"
        }
        ${
          (item.width === "50%-25%-25%" || item.width === "25%-25%-50%") &&
          "grid-cols-1 lg:grid-cols-4 lg:gap-4 "
        } 
        ${
          (item.width === "67%-33%" || item.width === "33%-67%") &&
          "grid-cols-1 lg:grid-cols-5 lg:gap-4"
        } 
       
      `}
    >
      {columns.map((column) => {
        return column.items.map((itemColumn, index) => {
          if (itemColumn.type === "richText") {
            return (
              <RichText
                key={itemColumn.order_column}
                itemColumn={itemColumn}
                item={item}
                index={index}
              />
            );
          }
          if (itemColumn.type === "imagenes") {
            return (
              <ArticleImages
                key={itemColumn.order_column}
                itemColumn={itemColumn}
                item={item}
                index={index}
              />
            );
          }
          if (itemColumn.type === "acordion") {
            return (
              <ArticleAccordion
                key={itemColumn.order_column}
                itemColumn={itemColumn}
              />
            );
          }
          if (itemColumn.type === "botones") {
            return (
              <ArticleButtons
                key={itemColumn.order_column}
                itemColumn={itemColumn}
                item={item}
                index={index}
              />
            );
          }
        });
      })}
    </section>
  );
};
