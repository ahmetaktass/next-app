import { Tooltip } from "@mui/material";

const truncate = (str, length) => {
  if (str.length > length) {
    return (
      <Tooltip title={str}>
        <span>{str.slice(0, length)}...</span>
      </Tooltip>
    );
  }
  return str;
};

export default truncate;
