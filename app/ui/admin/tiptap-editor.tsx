"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect, useRef } from "react";
import { BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon, LinkIcon, H2Icon, H3Icon } from "@heroicons/react/24/outline";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editorRef = useRef<ReturnType<typeof useEditor>>(null);

  function handleSetLink() {
    const editor = editorRef.current;
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-red-600 underline",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "font-post-content prose prose-sm max-w-none min-h-75 px-4 py-3 focus:outline-none",
      },
      handleKeyDown: (view, event) => {
        const isMod = event.metaKey || event.ctrlKey;
        if (isMod && event.key.toLowerCase() === "k") {
          event.preventDefault();
          handleSetLink();
          return true;
        }
        const ed = editorRef.current;
        if (!ed) return false;

        if (event.key === "Tab" && !event.shiftKey) {
          event.preventDefault();
          if (ed.can().sinkListItem("listItem")) {
            ed.chain().focus().sinkListItem("listItem").run();
          } else {
            ed.chain().focus().insertContent("\u00A0\u00A0\u00A0\u00A0").run();
          }
          return true;
        }

        if (event.key === "Tab" && event.shiftKey) {
          event.preventDefault();
          if (ed.can().liftListItem("listItem")) {
            ed.chain().focus().liftListItem("listItem").run();
          }
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  function setLink() {
    const url = window.prompt("Enter URL");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const buttonClass = (active: boolean) =>
    `px-2 py-1 rounded text-sm font-nav font-medium transition-colors ${
      active
        ? "bg-chiefs-1 text-chiefs-light"
        : "bg-chiefs-3 text-chiefs-light hover:bg-chiefs-a hover:text-chiefs-dark"
    }`;

  return (
    <div className="border border-chiefs-3 rounded-lg overflow-hidden bg-chiefs-light">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-chiefs-3 px-2 py-2 bg-chiefs-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          <BoldIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          <ItalicIcon className="h-4 w-4" />
        </button>
        <div className="w-px bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <H2Icon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
        >
          <H3Icon className="h-4 w-4" />
        </button>
        <div className="w-px bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <ListBulletIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <NumberedListIcon className="h-4 w-4" />
        </button>
        <div className="w-px bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={buttonClass(editor.isActive("link"))}
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}