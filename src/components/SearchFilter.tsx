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

  const tagListAll = () => {
    return (containers.map((container) => (
      container.items.map((item) => (
        item.tags?.map((tag:string) => (
          TagData.push({name:tag})
        ))
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

  const ShowTagFilter = () => {
    tagListAll();
    setShowTagFilter(true);
  };

  const SearchTasks = () => {
    setShowTagFilter(false);
  };

  const onAddTagFromList = (e: any) => {
    const tagtext = e.currentTarget.dataset.item;
    setTags([...tags, tagtext]);
  };

  const filterTags = (e: any) => {
    const search = e.toLowerCase();
    const filterTags = TagData.filter(tags => tags.name.toLowerCase().includes(search));
    setTags(filterTags);
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
                {tagListAll()}
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
