import React from "react";
import { Editor as EditField } from "@tinymce/tinymce-react";

const Editor = React.memo(
  ({
    onChange,
    isMinimalize = false,
    ...rest
  }: {
    onChange: (val: string) => void;
    isMinimalize?: boolean;
  }) => {
    return (
      <EditField
        apiKey="wcrtq4xqojwt47khn0bfga9f2t1otyufj6h6gwhoiol5ivty"
        init={{
          width: "100%",
          height: 400,
          block_unsupported_drop: false,
          automatic_uploads: true,
          image_title: true,
          file_picker_types: "image",
          images_upload_url: `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs/editor/upload`,

          images_upload_handler: (blobInfo: any, progress: any) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());

              const xhr = new XMLHttpRequest();
              xhr.open(
                "POST",
                `${process.env.NEXT_PUBLIC_BASE_URL}api/blogs/editor/upload`
              );

              xhr.upload.onprogress = (e) => {
                progress((e.loaded / e.total) * 100);
              };

              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  const json = JSON.parse(xhr.responseText);

                  if (json) {
                    resolve(`${process.env.NEXT_PUBLIC_BASE_URL}/${json}`);
                  } else {
                    reject("Invalid JSON response");
                  }
                } else {
                  reject(`HTTP Error: ${xhr.status}`);
                }
              };

              xhr.onerror = () => {
                reject("Image upload failed due to a network error.");
              };

              xhr.send(formData);
            });
          },

          file_picker_callback: function (callback, value, meta) {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              const file = (this as any).files[0];

              const reader = new FileReader();
              reader.onload = function (e: any) {
                callback(e.target.result, {
                  alt: file.name,
                });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },

          plugins: [
            "image",
            "table",
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
          menubar: isMinimalize
            ? ""
            : "favs file edit view insert format tools table help",
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
