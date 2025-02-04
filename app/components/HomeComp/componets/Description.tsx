type DescriptionProps = {
    description: string;
  };
  
  const Description = ({ description }: DescriptionProps) => {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    );
  };
  
  export default Description;
  