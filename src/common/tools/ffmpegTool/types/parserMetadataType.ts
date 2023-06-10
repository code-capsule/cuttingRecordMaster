/**
 * @todo 执行 ffmpeg 与 ffprobe 之后的元数据类型声明
 */

export interface IStreamDisposition {
  default?: number;
  dub?: number;
  original?: number;
  comment?: number;
  lyrics?: number;
  karaoke?: number;
  forced?: number;
  hearing_impaired?: number;
  visual_impaired?: number;
  clean_effects?: number;
  attached_pic?: number;
  timed_thumbnails?: number;
  captions?: number;
  descriptions?: number;
  metadata?: number;
  dependent?: number;
  still_image?: number;
}
/**
 * @description 视频流数据
 */
export interface IParserVideoMetadataStream {
  index?: number;
  codec_name?: string;
  codec_long_name?: string;
  profile?: string;
  codec_type?: string;
  codec_tag_string?: string;
  codec_tag?: string;
  width?: number;
  height?: number;
  coded_width?: number;
  coded_height?: number;
  closed_captions?: number;
  film_grain?: number;
  has_b_frames?: number;
  sample_aspect_ratio?: string;
  display_aspect_ratio?: string;
  pix_fmt?: string;
  level?: number;
  color_range?: string;
  color_space?: string;
  color_transfer?: string;
  color_primaries?: string;
  chroma_location?: string;
  field_order?: string;
  refs?: number;
  is_avc?: string;
  nal_length_size?: number;
  id?: string;
  r_frame_rate?: string;
  avg_frame_rate?: string;
  time_base?: string;
  start_pts?: number;
  start_time?: number;
  duration_ts?: number;
  duration?: number;
  bit_rate?: number;
  max_bit_rate?: string;
  bits_per_raw_sample?: number;
  nb_frames?: number;
  nb_read_frames?: string;
  nb_read_packets?: string;
  extradata_size?: number;
  tags?: {
    language?: string;
    handler_name?: string;
    vendor_id?: string;
  };
  disposition?: IStreamDisposition;
}

/**
 * @description 音频流数据
 */
export interface IParserAudioMetadataStream {
  index?: number;
  codec_name?: string;
  codec_long_name?: string;
  profile?: string;
  codec_type?: string;
  codec_tag_string?: string;
  codec_tag?: string;
  sample_fmt?: string;
  sample_rate?: number;
  channels?: number;
  channel_layout?: string;
  bits_per_sample?: number;
  id?: string;
  r_frame_rate?: string;
  avg_frame_rate?: string;
  time_base?: string;
  start_pts?: number;
  start_time?: number;
  duration_ts?: number;
  duration?: number;
  bit_rate?: number;
  max_bit_rate?: string;
  bits_per_raw_sample?: string;
  nb_frames?: number;
  nb_read_frames?: string;
  nb_read_packets?: string;
  extradata_size?: number;
  tags?: {
    language?: string;
    handler_name?: string;
    vendor_id?: string;
  };
  disposition?: IStreamDisposition;
}

