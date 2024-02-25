"use client";

import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export const PostCreateForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
    imageUpload: false,
  });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [filename, setFilename] = useState("");

  const deleteFile = () => {
    setFilename("");
    setFormData({ ...formData, imageUrl: "" });
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setError("");
      setLoading({ ...loading, imageUpload: true });
      const file = e.target.files![0];
      const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (!validFileTypes.find((type) => type === file.type)) {
        setError("업로드 할 수 없는 확장자입니다");
        deleteFile();
        return;
      }
      const form = new FormData();
      form.append("image", file);

      await axios.post("/api/posts/upload", form).then((response) => {
        if (response.data.success) {
          setFormData({ ...formData, imageUrl: response.data.imageUrl });
        } else {
          setError("사진 업로드에 실패하였습니다");
          deleteFile();
        }
      });
    } catch (error) {
      console.log(error);
      setError("사진 업로드에 실패하였습니다");
    } finally {
      setLoading({ ...loading, imageUpload: false });
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.imageUrl) {
        setError("사진이 필요합니다");
        return;
      }

      await axios.post("/api/posts", formData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/main");
        } else {
          toast.error(response.data.message);
          deleteFile();
          setFormData({ ...formData, title: "", content: "", imageUrl: "" });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("글을 게시하는데 실패하였습니다!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="h-full">
        <CardHeader className="flex flex-row justify-between">
          <span className="text-lg font-bold">물건 내놓기</span>
          <Button type="submit" variant={"blue"}>
            게시하기
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <Input
            required
            value={formData.title}
            disabled={loading.submit}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="제목"
          />
          <Textarea
            required
            value={formData.content}
            disabled={loading.submit}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="설명"
            className="outline-none resize-none"
          />
          <div className="flex flex-col gap-y-2">
            {formData.imageUrl ? null : (
              <>
                <div className="flex items-center rounded-full gap-4">
                  <Button asChild variant={"outline"} className="">
                    <label
                      htmlFor="file"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {loading.imageUpload ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <span>사진 업로드</span>
                      )}
                    </label>
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-800/80">JPEG</span>
                    <span className="text-zinc-400">|</span>
                    <span className="text-sm text-zinc-800/80">JPG</span>
                    <span className="text-zinc-400">|</span>
                    <span className="text-sm text-zinc-800/80">PNG</span>
                  </div>
                  <div className="gap-2 hidden">
                    <Input
                      disabled={loading.imageUpload}
                      value={filename}
                      type="file"
                      id="file"
                      className="cursor-pointer hidden bg-inherit text-white"
                      onChange={handleUploadImage}
                    />
                  </div>
                </div>
                <FormError message={error} />
              </>
            )}
          </div>
          {formData.imageUrl ? (
            <div className="flex flex-col gap-y-4">
              <Image
                className="p-2 border shadow-sm rounded-xl"
                src={formData.imageUrl}
                width={500}
                height={500}
                alt="post-image"
                style={{ width: "auto", height: "auto" }}
              />
              <Button
                type="button"
                onClick={() => {
                  deleteFile();
                }}
                variant={"destructive"}
                className="rounded-xl font-bold"
              >
                사진삭제
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </form>
  );
};
