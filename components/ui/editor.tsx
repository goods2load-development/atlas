import React from "react";
import { Editor as EditField } from "@tinymce/tinymce-react";

const Editor = React.memo(
  ({ onChange, ...rest }: { onChange: (val: string) => void }) => {
    return (
      <EditField
        apiKey="1zr97k784iih6tmou388pmbr9n1nd7v1n82l7afbc0nhkh3w"
        init={{
          width: "100%",
          height: 400,
          block_unsupported_drop: false,
          plugins: [
            "accordion",
            "table",
            "image",
            "anchor",
            "autolink",
            "charmap",
            "directionality",
            "emoticons",
            "insertdatetime",
            "link",
            "lists",
            "nonbreaking",
            "pagebreak",
            "preview",
            "visualblocks",
            "visualchars",
            "fullscreen",
          ],
          toolbar: [
            "undo redo | h1 h2 h3 h4 h5 h6 | formatselect | fontfamily fontsize | bold italic underline strikethrough |" +
              "alignleft aligncenter alignright alignjustify | bullist numlist | indent outdent | lineheight |" +
              "forecolor backcolor | removeformat | subscript superscript" +
              "blockquote | hr |  paste | language |" +
              "link unlink | image media | code | visualaid | selectall | remove print | pagebreak",
          ],
          font_family_formats:
            "Avenir Black=Avenir Black; Avenir Heavy=Avenir Heavy; Avenir Medium=Avenir Medium;",
          file_picker_types: "image",
          menubar: "favs file edit view insert format tools table help",
        }}
        onEditorChange={(v) => {
          onChange(v);
        }}
        {...rest}
      />
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
