import { useState, FC } from "react";
import "./SearchFilter.css";

interface SearchFilterProps {
  containers: IContainer[];
}

const SearchFilter: FC<SearchFilterProps> = (
  {
    containers,
  }
  ) => {

  const tagListAll = async () => {
    return (containers.map((container) => (
      container.items.map((item) => (
        item.tags?.map((tag:string, i:number) => {
          TagData.push({name:tag})
          // console.log(TagData);
        })
      ))
    )))
  }

  const TagData: {
    name: string;
  }[] = [
    // {name: "tag1"},
    // {name: "tag2"},
    // {name: "tag3"},
    // {name: "tag4"},
    // {name: "tag5"},
    // {name: "tag6"},
    // {name: "tag7"},
  ]

  const [tags, setTags] = useState(TagData);

  const [showTagFilter, setShowTagFilter] = useState(false);

  const ShowTagFilter = async () => {
    await tagListAll();
    setShowTagFilter(true);
  };

  const SearchTasks = () => {
    setShowTagFilter(false);
  };

  const onAddTagFromList = (e: any) => {
    console.log(e.currentTarget.getAttribute("data-item"));
    const tagtext = e.currentTarget.getAttribute("data-item");
    const newTags = [...tags];
    newTags.push(tagtext);
    setTags(newTags);
    // let name = {name: tagtext};
    // TagData.push(name);
  };

  const filterTags = (e: any) => {
    const search = e.toLowerCase();
    const filterTags = TagData.filter(tags => tags.name.toLowerCase().includes(search));
    setTags(filterTags);
    console.log(TagData);
  }

  return (
    <div className="search-filter-container">
      <div className="search-filter-box">
        <button className="search-filter-button" onClick={ShowTagFilter}>タグで検索する</button>
        {showTagFilter ? (
            <>
              <div className="tag-created">{tags?.join(" / ")}</div>
              <input 
                id="tags"
                type="text"
                onChange={(e) => filterTags(e.target.value)}
                className="search-filter-input"
              />
              <ul>
                {containers.map((container) => (
                    container.items.map((item) => (
                      item.tags?.map((tag:string, i:number) => {
                        TagData.push({name: tag});
                        // return (
                        //   <li onClick={onAddTagFromList} key={i} data-item={tag}>
                        //     {tag}
                        //   </li>
                        // )
                      })
                    ))
                  ))}
                {tags.map((tag, i)=> {
                  return (
                    <li onClick={onAddTagFromList} key={i} data-item={tag.name}>
                      {tag.name}
                    </li>
                  )
                })}
              </ul>
              <button className="search-filter-button" onClick={SearchTasks}>検索</button>
            </>
          ) : (
            <>
            </>
          )
        }
      </div>
    </div>
  );
};
export default SearchFilter;
