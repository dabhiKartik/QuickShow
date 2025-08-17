/** @format */

const BlurCircle = ({
  top = "auto",
  left = "auto",
  bottom = "bottom",
  right = "right",
}) => {
  return (
    <div
      className='absolute  -z-50 h-58 w-58  bg-primary/30 rounded-3xl blur-3xl'
      style={{ top: top, left: left, bottom: bottom, right: right }}
    ></div>
  );
};

export default BlurCircle;
